import { twMerge, type ClassNameValue } from 'tailwind-merge'

export function cn(...inputs: ClassNameValue[]) {
    return twMerge(...inputs)
}
// theme colors

// 后藤一里: #F3A0B5
// 伊地知虹夏: #F1D367
// 山田凉: #436AAF
// 喜多郁代: #E2545E