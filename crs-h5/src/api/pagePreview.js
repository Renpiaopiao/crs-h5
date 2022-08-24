import nodeFetch from '../utils/nodeFetch'

export async function getPageJson(params) {
    const res = nodeFetch.get('/getH5PageJson',{params})
    return res.data
}