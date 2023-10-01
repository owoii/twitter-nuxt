import { removeRefreshToken } from "~/server/db/refreshTokens"

export default defineEventHandler(async event => {
	try {
		const refreshToken = getCookie(event, "refresh_token") as string
		//删除 token
		await removeRefreshToken(refreshToken)
	} catch (error) {

	}
	sendRefreshToken(event, null)
	return {
		message: "Done"
	}
})