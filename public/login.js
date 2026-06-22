async function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const message =
        document.getElementById("message");

    message.innerText = "";

    try {

        const snapshot =
            await db.collection("users")
                .where("username","==",username)
                .where("password","==",password)
                .where("active","==",true)
                .get();

        if (!snapshot.empty) {

            const user =
                snapshot.docs[0].data();

            localStorage.setItem(
                "loggedUser",
                user.username
            );

            localStorage.setItem(
                "userRole",
                user.role
            );

            if (user.role === "admin") {

                window.location.href =
                    "admin.html";

            } else {

                window.location.href =
                    "exam.html";

            }

        } else {

            message.innerText =
                "اسم المستخدم أو كلمة المرور غير صحيحة";

        }

    } catch (error) {

        console.error(error);

        message.innerText =
            "خطأ في الاتصال بقاعدة البيانات";

    }
}