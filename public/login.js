async function login() {

    const username =
        document
        .getElementById("username")
        .value
        .trim();

    const password =
        document
        .getElementById("password")
        .value
        .trim();

    const message =
        document.getElementById("message");

    message.innerText = "";

    if (!username || !password) {

        message.innerText =
            "يرجى إدخال جميع البيانات";

        return;
    }

    try {

        const response =
            await fetch("/api/login", {

                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })

            });

        const data =
            await response.json();

        if (data.success) {

            localStorage.setItem(
                "loggedUser",
                data.username
            );

            window.location.href =
                "exam.html";

        } else {

            message.innerText =
                data.message;

        }

    } catch (error) {

        message.innerText =
            "تعذر الاتصال بالخادم";

    }

}