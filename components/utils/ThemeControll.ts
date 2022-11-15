export const changeTheme = (type: string) => {

    switch (type) {
        case "dark":
            localStorage.theme = "dark";
            document.documentElement.classList.add("dark");
            break;
        case "light":
            localStorage.theme = "light";
            document.documentElement.classList.remove("dark");
            break;

        default:
            if (window.matchMedia("(prefers-color-scheme: dark)").matches)
            {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            localStorage.removeItem("theme");
            break;
    }
}