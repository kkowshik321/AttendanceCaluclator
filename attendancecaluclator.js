document.getElementById("attendanceform").addEventListener("submit", function (e) {
    e.preventDefault();

    let total = Number(document.getElementById("total").value);
    let attended = Number(document.getElementById("attended").value);
    let required = Number(document.getElementById("percentage").value);
    let result = document.getElementById("result");

    let current = (attended / total) * 100;

    // 1. Current percentage < required → how many more classes to attend?
    if (current < required) {
        let x = 0;
        // add attended classes until requirement is reached
        while (((attended + x) / (total + x)) * 100 < required) {
            x++;
        }

        result.innerHTML = `
            <p>Current Attendance: <b>${current.toFixed(2)}%</b></p>
            <p style="color:black;">You must attend <b>${x}</b> more classes.</p>
        `;
        return;
    }

    // 2. Current percentage > required → how many classes can be absent?
    if (current > required) {
        let x = 0;
        // add absent classes until percentage drops below required
        while ((attended / (total + x)) * 100 >= required) {
            x++;
        }

        result.innerHTML = `
            <p>Current Attendance: <b>${current.toFixed(2)}%</b></p>
            <p style="color:black;">You can be absent for <b>${x - 1}</b> more classes.</p>
        `;
        return;
    }

    // 3. If equal
    result.innerHTML = `
        <p>Your attendance is exactly <b>${required}%</b>. Maintain it.</p>
    `;
});
