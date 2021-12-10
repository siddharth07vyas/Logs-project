let API = 'http://localhost:8000/api/'
export const GetLogs = async() =>{
 const response  = await fetch(API+'logs');
 const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

export const AddLog = async(logData) =>{
    const response = await fetch(API+'log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ log: logData }),
      });
      const body = await response.json();
      return body;
}