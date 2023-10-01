/**
 *
 * @param rawData 原始数据
 * @param selects 需要保留的字段
 * @returns
 */
export function Transformer<T extends Record<string, unknown>>(
  rawData: Record<string, unknown>,
  selects: T
): Partial<T> {
  const transformerResult: Partial<T> = {};

  for (const key in selects) {
    if (selects[key]) {
      transformerResult[key as keyof T] = (rawData as Partial<T>)[key];
    }
  }

  return transformerResult;
}
