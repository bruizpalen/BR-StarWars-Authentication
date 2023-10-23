To start the Frontend development, you must have `$ cd Front` and install (`$ npm install`) and run `$ npm run dev`

Backend:

1. Install/update all packages specified in Pipfile: `$ pipenv install`
2. Launch the backend: `$ pipenv run start` (Check Pipfile [scripts] for details).
3. To reset and launch the dummy set of data `$ pipenv run reset_db`

ENV variables:
.env in Front folder:
VITE_REACT_APP_API_URL (backend in the port 3000)
