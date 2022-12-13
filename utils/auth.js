
export const auth = async (mobile, VCode) => {
    const body_data = [
        'username=' + mobile,
        'password=' + VCode
    ]
    const response = await fetch("http://localhost:8001/api/v1/user/login", {
        method: 'POST',
        body: body_data.join('&'),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    const data = await response.json()
    if (response.status === 200){
        const resp = await fetch('http://localhost:8001/api/v1/user/verify_token', {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + data?.access_token
            }
        });
        if (resp.status === 200){
            const userData = await resp.json();
            return {
                user: userData
            }
        }
    }
    return null;
}