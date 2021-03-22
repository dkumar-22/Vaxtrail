import { email, pass } from "./adminLogin";

export const initialState = {
  logged: false,
  admin: email,
  password: pass,
  user: null,
  id: "",
  allHospitals: [],
  details: {},
  vaccines: [],
  nearbyHospitals: [],
  govtHospitals: [],
  pvtHospitals: [],
  govtnearby: [],
  pvtnearby: [],
  longitude: 0,
  latitude: 0,
};

// console.log(initialState);

function reducer(state, action) {
  console.log("🕺", action);
  switch (action.type) {
    case "SET_LOGGED":
      return {
        ...state,
        logged: action.logged,
      };
    case "SET_VACCINES":
      return {
        ...state,
        vaccines: action.vaccines,
      };
    case "SET_LONGITUDE":
      return {
        ...state,
        longitude: action.longitude,
      };
    case "SET_ID":
      return {
        ...state,
        id: action.id,
      };
    case "SET_LATITUDE":
      return {
        ...state,
        latitude: action.latitude,
      };
    case "SET_NEARBYHOSPITALS":
      return {
        ...state,
        nearbyHospitals: action.nearbyHospitals,
      };
    case "SET_DETAILS":
      return {
        ...state,
        details: action.details,
      };
    case "SET_GOVTHOSPITALS":
      return {
        ...state,
        govtHospitals: action.govtHospitals,
      };
    case "SET_PVTHOSPITALS":
      return {
        ...state,
        pvtHospitals: action.pvtHospitals,
      };
    case "SET_PVTNEARBY":
      return {
        ...state,
        pvtnearby: action.pvtnearby,
      };
    case "SET_GOVTNEARBY":
      return {
        ...state,
        govtnearby: action.govtnearby,
      };
    case "SET_ALLHOSPITALS":
      return {
        ...state,
        allHospitals: action.allHospitals,
      };
    default:
      return state;
  }
}

export default reducer;
