export interface BmiResult {
    weight: number;
    height: number;
    bmi: string;
}
export declare const calculateBmi: (height: number, weight: number) => BmiResult;
