import request from "@/utils/request";

export function output() {
    return request({
        url: "tool/excel/output",
        method: "get",
        responseType: "blob",
    })
}