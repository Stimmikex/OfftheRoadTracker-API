export const convertGeoJson = (data) => {
    const track = data;
    const features = [];
    const feCo = {
        "type": "FeatureCollection",
        "features" : features,
    }
    track.forEach((tr) => {
        const fe = {
            "properties": {
                "name": tr.name,
                "date": tr.date,
                "length": tr.length,
                "description": tr.description,
                "year": tr.year,
            },
            "geometry": {
                "type": tr.type,
                "coordinates": [
                    tr.coordinates_lat,
                    tr.coordinates_long,
                ]
            }
        }
        features.push(fe);
    })
    return feCo;
}