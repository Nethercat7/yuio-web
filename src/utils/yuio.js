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