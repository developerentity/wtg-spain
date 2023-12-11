import $ from "jquery";

export async function fetchCities() {
  try {
    const response = await $.ajax({
      url: "http://localhost:3001/cities",
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error(">>>>>>>>>>ERROR", error);
  }
}

export async function fetchTypes() {
  try {
    const response = await $.ajax({
      url: "http://localhost:3001/types",
      method: "GET",
    });

    return response;
  } catch (error) {
    console.error(">>>>>>>>>>ERROR", error);
  }
}
