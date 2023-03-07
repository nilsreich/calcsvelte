export const runPyodide = async (code: string, worker: Worker) => {

    const id = Math.random().toString(36).slice(2);
    worker.postMessage({ id, code });

    return new Promise((resolve, reject) => {
        worker.onmessage = (e) => {
            if (e.data.id === id) {
                console.log(e.data);
                resolve(e.data.result);
            }
        };
        worker.onerror = (e) => {
            reject(e);
        };
    }

    )
}