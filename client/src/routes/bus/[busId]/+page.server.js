import { error } from '@sveltejs/kit';

export async function load({ params, fetch, url }) {
    const busId = params.busId;
    const data = await (await fetch(`${url.origin}/api/bus/${busId}`)).json();
    console.log(data);
    if (data.bus !== null) {
        return data;
    }
    

    throw error(404, 'Not found');
}