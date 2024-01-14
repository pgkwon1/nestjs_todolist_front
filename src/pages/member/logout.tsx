import useLogout from "@/hooks/useLogout";

export default function LogOut() {
  const logout = useLogout();
  logout();
  return null;
}
