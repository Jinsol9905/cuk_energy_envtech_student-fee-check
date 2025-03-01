function moveToNextInput(current, nextFieldId) {
    if (current.value.length === current.maxLength) {
        document.getElementById(nextFieldId).focus();
    }
}

function checkPayment() {
    var studentId = document.getElementById("studentId").value;
    var name = document.getElementById("name").value;
    var phone1 = document.getElementById("phone1").value;
    var phone2 = document.getElementById("phone2").value;
    var phone3 = document.getElementById("phone3").value;

    var phone = phone1 + "-" + phone2 + "-" + phone3;

    if (!studentId || !name || !phone1 || !phone2 || !phone3) {
        alert("모든 정보를 입력해주세요!");
        return;
    }

    var resultElement = document.getElementById("result");
    resultElement.innerText = "조회 중...";
    resultElement.style.display = "block";
    resultElement.className = "";

    var url = "https://script.google.com/macros/s/AKfycbyB5Hj8HiNq794kEOZPQUM1E_nZWt6bnqBFeD0i0UrkSOAWtOQLhKJe2BQ8UOU43JXM/exec" + 
              "?studentId=" + encodeURIComponent(studentId) + 
              "&name=" + encodeURIComponent(name) + 
              "&phone=" + encodeURIComponent(phone);

    fetch(url)
    .then(response => response.text())
    .then(data => {
        resultElement.innerText = "결과: " + data;
        if (data.includes("납부")) {
            resultElement.className = "result-paid";
        } else {
            resultElement.className = "result-unpaid";
        }
    })
    .catch(error => {
        resultElement.innerText = "오류 발생! 다시 시도해주세요.";
        resultElement.className = "result-unpaid";
    });
}
