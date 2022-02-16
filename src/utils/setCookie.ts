export default function setCookie(
  cookie_name: string,
  value: string,
  days: number
) {
  const exDate = new Date();
  exDate.setDate(exDate.getDate() + days);
  const cookie_value =
    escape(value) + (days == null ? "" : "; expires=" + exDate.toUTCString());
  document.cookie = cookie_name + "=" + cookie_value;
}
