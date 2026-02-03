interface FetchFacilityAllParams {
    setFacilities: (data : { facilityId: number, name: string, type: string }[]) => void;
}

export const fetchFacilityAll = async ({ setFacilities }: FetchFacilityAllParams) => {
    const response = await fetch("/api/proxy/facility/all");
    const data = await response.json();
    setFacilities(data);
};