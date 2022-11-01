const FLEET = [

    //CONVENTIONAL
    {start_range: 3309, end_range: 3358, name: '2006 NFI C40LFR'},
    {start_range: 7409, end_range: 7409, name: '2000 NFI D40LF'},
    {start_range: 7413, end_range: 7413, name: '2000 NFI D40LF'},
    {start_range: 7419, end_range: 7419, name: '2000 NFI D40LF'},
    {start_range: 7426, end_range: 7426, name: '2000 NFI D40LF'},
    {start_range: 7438, end_range: 7438, name: '2001 NFI D40LF'},
    {start_range: 7439, end_range: 7439, name: '2001 NFI D40LF'},
    {start_range: 7443, end_range: 7443, name: '2001 NFI D40LF'},
    {start_range: 7445, end_range: 7445, name: '2001 NFI D40LF'},
    {start_range: 7447, end_range: 7499, name: '2006 NFI D40LFR'},
    {start_range: 7501, end_range: 7504, name: '2006 NFI D40LFR'},
    {start_range: 8102, end_range: 8117, name: '2007 NFI D60LFR'},
    {start_range: 8118, end_range: 8156, name: '2009 NFI DE60LFR'},
    {start_range: 9201, end_range: 9276, name: '2000 OBI Orion V'},
    {start_range: 9277, end_range: 9285, name: '2007 OBI Orion V'},
    {start_range: 9401, end_range: 9499, name: '2009 Nova Bus LFS HEV'},
    {start_range: 9501, end_range: 9542, name: '2009 Nova Bus LFS HEV'},
    {start_range: 9543, end_range: 9581, name: '2009 Nova Bus LFS'},
    {start_range: 9583, end_range: 9590, name: '2009 Nova Bus LFS'},
    {start_range: 9605, end_range: 9699, name: '2007 Nova Bus LFS'},
    {start_range: 9701, end_range: 9725, name: '2007 Nova Bus LFS'},
    {start_range: 9726, end_range: 9791, name: '2008 Nova Bus LFS'},
    {start_range: 9797, end_range: 9799, name: '2008 Nova Bus LFS'},
    {start_range: 12001, end_range: 12025, name: '2012 NFI XDE60'},
    {start_range: 14001, end_range: 14045, name: '2014 NFI XN40'},
    {start_range: 15001, end_range: 15021, name: '2015 NFI XDE60'},
    {start_range: 16001, end_range: 16051, name: '2016 NFI XN40'},
    {start_range: 16101, end_range: 16130, name: '2016 NFI XD40'},
    {start_range: 16137, end_range: 16137, name: '2016 NFI XD40'},
    {start_range: 16201, end_range: 16226, name: '2016 NFI XDE60'},
    {start_range: 18001, end_range: 18042, name: '2018 NFI XDE60'},
    {start_range: 18043, end_range: 18063, name: '2019 NFI XDE60'},
    {start_range: 18101, end_range: 18206, name: '2018 NFI XN40'},
    {start_range: 18301, end_range: 18404, name: '2018 Nova Bus LFS HEV'},
    {start_range: 18451, end_range: 18473, name: '2018 Nova Bus LFS Suburban'},
    {start_range: 19001, end_range: 19047, name: '2019 NFI XDE60'},
    {start_range: 19101, end_range: 19147, name: '2019 NFI XN40'},
    {start_range: 19301, end_range: 19302, name: '2019 Nova Bus LFSe'},
    {start_range: 19303, end_range: 19304, name: '2019 NFI XE40'},
    {start_range: 19401, end_range: 19432, name: '2019 Alexander Dennis Enviro500'},
    {start_range: 21001, end_range: 21025, name: '2021 NFI XDE60'},
    {start_range: 21401, end_range: 21425, name: '2021 Alexander Dennis Enviro500'},


    //TROLLEY
    {start_range: 2101, end_range: 2101, name: '2005 NFI E40LF'},
    {start_range: 2102, end_range: 2199, name: '2006 NFI E40LFR'},
    {start_range: 2201, end_range: 2289, name: '2006 NFI E40LFR'},
    {start_range: 2501, end_range: 2501, name: '2006 NFI E60LFR'},
    {start_range: 2502, end_range: 2540, name: '2007 NFI E60LFR'},
    {start_range: 2541, end_range: 2574, name: '2009 NFI E60LFR'},

    //CS
    {start_range: 16501, end_range: 16562, name: '2016 Girardin G5'},
    {start_range: 17506, end_range: 17564, name: '2017 Girardin G5'},
    {start_range: 18510, end_range: 18527, name: '2018 Girardin G5'},
    {start_range: 19503, end_range: 19535, name: '2019 ARBOC SOM 28'},
    {start_range: 19538, end_range: 19549, name: '2020 ARBOC SOM 28'},
    {start_range: 19550, end_range: 19554, name: '2019 Girardin G5'},
    {start_range: 21501, end_range: 21509, name: '2020 ARBOC SOF 27'},
    {start_range: 21510, end_range: 21562, name: '2021 ARBOC SOF 27'},

    ///BLUE BUS

    {start_range: 17501, end_range: 17505, name: 'Blue Bus 2017 ARBOC SOM 28'},
    {start_range: 18501, end_range: 18509, name: 'Blue Bus 2018 ARBOC SOM 28'},
    {start_range: 19501, end_range: 19502, name: 'Blue Bus 2019 ARBOC SOM 28'},
    {start_range: 19536, end_range: 19537, name: 'Blue Bus 2020 ARBOC SOM 28'},
    {start_range: 80701, end_range: 80706, name: 'Blue Bus 2007 Nova Bus LFS'},
    {start_range: 80901, end_range: 80909, name: 'Blue Bus 2009 Nova Bus LFS'},
    {start_range: 81201, end_range: 81217, name: 'Blue Bus 2012 NFI XD40'},

    // BLUEBUS TRANSFERS XD40
    {start_range: 16601, end_range: 16605, name: 'Blue Bus 2016 NFI XD40'},
    {start_range: 16131, end_range: 16136, name: 'Blue Bus 2016 NFI XD40'},
    {start_range: 16138, end_range: 16140, name: 'Blue Bus 2016 NFI XD40'}
];

const getFleetModel = (vehicleId) => {
    vehicleId = typeof vehicleId !== "number" ? parseInt(vehicleId) : vehicleId
    for (let range of FLEET) {
        if (vehicleId >= range.start_range && vehicleId <= range.end_range) {
            return range.name;
        }
    }
    console.log("UNKNOWN VEHICLE ID " + vehicleId);
    return "UNKNOWN VEHICLE " + vehicleId;
}
module.exports = { getFleetModel };

/**
 * 
 * DUMPER
 * 
clear()
let head = document.querySelector(".sortable.jquery-tablesorter")
let body = head.children[1]
let fleet = [];
for (let node of body.children) {
    if (node.innerText === "Conventional Buses") { continue; }
    let range = node.children[0].firstChild.innerText;
    
    let year = node.children[2].innerText
    let manuf = node.children[3].firstChild.innerText;
    let model = node.children[4].firstChild.innerText;
    let separate_ranges = range.replaceAll("–", "-").replace(", ", ",").replace(",\n", ",").split(",")
    for (let r of separate_ranges) {
        if (r.includes("-")) {
            console.log(r)
            let rr = r.split("-");
            fleet.push({ start_range: parseInt(rr[0]), end_range: parseInt(rr[1]), name: `${year} ${manuf} ${model}` })
        } else {
            fleet.push({ start_range: parseInt(r), end_range: parseInt(r), name: `${year} ${manuf} ${model}` })
        }
    }
}
console.log(fleet)
 */