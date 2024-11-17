export function getCookie(CookieName)
{
  let keyName = CookieName + "=";
  let cookieArray = document.cookie.split('; ');
  let targetCookie = cookieArray.find((cookie) => cookie.indexOf(keyName) === 0);
  if (targetCookie != null)
    return (decodeURIComponent(targetCookie.substring(keyName.length)));
  else
    return null;
}

export function handle_42Redirect()
{
    let is_oauthRedirectInProgress = localStorage.getItem('oauthRedirectInProgress');
    console.log(is_oauthRedirectInProgress);
    if (is_oauthRedirectInProgress == null)
        return ;
    localStorage.removeItem('oauthRedirectInProgress');
    const oauthCode = getOauthCode();
    console.log(oauthCode);
    sendOauthCodeToBackEnd(oauthCode);
}

function sendOauthCodeToBackEnd(oauthCode) {
    const oauthToBackEndPath = `http://localhost:9000/auth/callback?code=${oauthCode}`;
    try {
        const response = fetch(oauthToBackEndPath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Error sending OAuth code to backend:', error);
        throw error;
    }
}

function getOauthCode()
{
    const urlParams = new URLSearchParams(window.location.search);
    const oauthCode = urlParams.get('code');
    console.log("oauthCode: " + oauthCode);
    return  oauthCode;
}
