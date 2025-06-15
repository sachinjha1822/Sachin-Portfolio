document.addEventListener("copy", (event) => {
    const selectData = window.getSelection().toString();
    event.clipboardData.setData(
        "text/plain",
        "Thank you for visiting this website! Sachin Jha"
    );
    event.preventDefault();
});

document.addEventListener("contextmenu", function(event) {
    alert("Inspect Elements Not Allowed");
    event.preventDefault();
});

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "u") {
        alert("Viewing source code is not allowed");
        event.preventDefault();
    }
});