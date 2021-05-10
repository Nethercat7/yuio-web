import request from "@/utils/request";

export function output() {
    return request({
        url: "tool/excel/output",
        method: "post",
        responseType: "blob",
    })
}