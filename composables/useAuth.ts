import { UserLoginDto, UserTransformer } from '~/types/user'
import jwtDecode from 'jwt-decode'
import { RefreshTokenJWTPayload } from '~/types/refreshToken'
export default () => {
  const useAuthToken = () => useState<string | null>('auth_token')
  const useAuthUser = () => useState<UserTransformer | null>('auth_user')
  const useAuthLoading = () => useState<boolean>('auth_loading', () => true)
  // 设置用户 Token
  const setToken = (newToken: string | null) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }

  // 设置用户信息
  const setUser = (newUser: UserTransformer | null) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }

  // 设置用户信息
  const setAuthLoading = (newUser: boolean) => {
    const authLoading = useAuthLoading()
    authLoading.value = newUser
  }

  // 为用户刷新 Token
  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh', {
          method: 'GET',
        })
        // 为用户设置 token
        setToken(data.access_token)
        resolve(true)
      } catch (e) {
        reject(e)
      } finally {
      }
    })
  }

  // 为用户刷新 Token
  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { user } = (await useFetchApi('/api/auth/user', {
          method: 'GET',
        })) as { user: UserTransformer }

        // 为用户设置 token
        setUser(user)
        resolve(true)
      } catch (e) {
        reject(e)
      } finally {
      }
    })
  }

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()

    if (!authToken.value) {
      return
    }
    const jwt = jwtDecode<RefreshTokenJWTPayload>(authToken.value)
    if (!jwt.exp) {
      return
    }
    const newRefreshTime = jwt.exp - 6000

    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime)
  }
  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setAuthLoading(true)
      try {
        await refreshToken()
        await getUser()

        reRefreshAccessToken()

        resolve(true)
      } catch (err) {
        reject(err)
      } finally {
        setAuthLoading(false)
      }
    })
  }
  const login = ({ username, password }: UserLoginDto) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username,
            password,
          },
          onResponseError(e){
            useToast().error(e.response._data.statusMessage)
            reject(e)
          }
        })

        setToken(data.accessToken)
        setUser(data.user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('/api/auth/logout', {
          method: 'POST',
        })
        setToken(null)
        setUser(null)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const register = (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('/api/auth/register', {
          method: 'POST',
          body: data,
        })
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
  return {
    login,
    useAuthToken,
    useAuthUser,
    initAuth,
    useAuthLoading,
    logout,
    register,
  }
}
