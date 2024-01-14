const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				console.log ('Hola post')
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			postLogin : async (infoUser) => {
				try{
					// fetching data from the backend
					console.log ('Hola post')
					console.log(infoUser)
					const resp = await fetch(process.env.BACKEND_URL + "api/token", {
						method: 'POST',
						body: JSON.stringify(infoUser), 
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const data = await resp.json()
					console.log ('Hola data')
					console.log(data)
					setStore({ token: data.token })
					localStorage.setItem('token', data.token);
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
