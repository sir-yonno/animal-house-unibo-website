const SERVER_URL = "http://localhost:8000"

export function isEqualPath(path, test) {
  if (test.includes(":")) {
    let subtest = test.replace(test.substring(test.lastIndexOf("/")), "")
    let subpath = path.replace(path.substring(path.lastIndexOf("/")), "")
    return subpath == subtest
  }
  return path == test
}

async function check_login(){
    let res = await fetch(`${SERVER_URL}/backoffice/is_logged_in`, {method: "POST"});
    res = await res.json();
    if(res.success){
        window.location = "/backoffice/login";
    }
}

async function get_my_id(){
    let res = await fetch(`${SERVER_URL}/backoffice/get_my_id`);
    res = await res.json();
    return res.id;
}


export { SERVER_URL, check_login, get_my_id};
