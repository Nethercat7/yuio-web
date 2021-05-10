import coord from "@/data/coord";

export function convertData(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = coord[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
}

export function fileDownload(stream, filename) {
    let blob = new Blob([stream], { type: "application/xlsx" });
    let url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}