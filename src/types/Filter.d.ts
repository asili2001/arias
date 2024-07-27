export type Operation = "+" | "-" | "*" | "/" | "none";

export type Filter = {
    path: string[],
    type: "singleSelect" | "multiSelect" | "dateRange" | "date" | "numberRange" | "dateRangeInRange" | "dateInRange",
    value: any,
    operation?: Operation,
    dataRangePrimary?: boolean,
    strict?: boolean
}
