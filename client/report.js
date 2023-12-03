const tbody = document.querySelector("tbody");
axios.defaults.headers.common["Authentication"] = localStorage.getItem("token");
let total = 0;
axios.get("http://localhost:5000/api/expense/getexpense").then(({ data }) => {
  data?.map((i) => {
    tbody.innerHTML += `<tr>
    <td scope="row">${i.createdAt.slice(0, 10)}</td>
    <td>${i.description}</td>
    <td>${i.category}</td>
    <td>${i.expense}</td>
  </tr>`;

    total += i.expense;
  });

  tbody.innerHTML += `<tr>
  <th scope="row"></th>
  <td></td>
  <td class="fw-bold">Total</td>
  <td id="Total">${total}</td>
</tr>`;
});

const downloadButton = document.querySelector("#downloadReport");
downloadButton.addEventListener("click", () => {
  axios.get("http://localhost:5000/api/premium/report").then((res) => {
    console.log(res.data);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = res.data;
    a.download = "report.json";
    document.body.appendChild(a);
    a.click();
  });
});
