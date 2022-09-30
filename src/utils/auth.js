export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
   return fetch(`${BASE_URL}/signup`, {
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
        },
       body: JSON.stringify({ email, password })
    })
       .then((response) => {
           try {
               if (response.status === 200) {
                   return response.json()
                }
            } catch (err) {
                return (err)
            }
        })
        .then((res) => {
            return res;
        })
        .catch(err => console.log('Ошибка. Запрос не выполнен: ', err));
}
