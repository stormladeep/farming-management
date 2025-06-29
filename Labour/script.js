
    async function loadEmployeeData() {
        try {
            const response = await fetch('fetch_data.php');
            const data = await response.json();

            // Populate Total Employees Table
            const totalEmployeesTable = document.getElementById('total-employees');
            data.employees.forEach((employee, index) => {
                const row = `<tr>
                                <td>${index + 1}</td>
                                <td>${employee.name}</td>
                                <td>${employee.surname}</td>
                                <td>${employee.address}</td>
                                <td>${employee.employee_id}</td>
                                <td>${employee.contact}</td>
                                <td>${employee.race}</td>
                                <td>${employee.gender}</td>
                                <td>${employee.position}</td>
                                <td>${employee.leave_days}</td>
                             </tr>`;
                totalEmployeesTable.innerHTML += row;
            });

            // Populate Employees on Leave Table
            const employeesOnLeaveTable = document.getElementById('employees-on-leave');
            data.employeesOnLeave.forEach((employee, index) => {
                const row = `<tr>
                                <td>${index + 1}</td>
                                <td>${employee.name}</td>
                                <td>${employee.surname}</td>
                                <td>${employee.status}</td>
                                <td>${employee.expected_return}</td>
                             </tr>`;
                employeesOnLeaveTable.innerHTML += row;
            });

            // Populate Employee Performance Table
            const performanceTable = document.getElementById('employee-performance');
            data.performance.forEach((performance, index) => {
                const row = `<tr>
                                <td>${index + 1}</td>
                                <td>${performance.name}</td>
                                <td>${performance.surname}</td>
                                <td>${performance.performance_rating}</td>
                                <td>${performance.remarks}</td>
                             </tr>`;
                performanceTable.innerHTML += row;
            });

            // Populate Best Employees Cards
            const bestEmployeesContainer = document.getElementById('best-employees');
            data.bestEmployees.forEach(employee => {
                const card = `<div class="card best-employee-card">
                                <img src="${employee.img_src}" class="card-img-top" alt="${employee.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${employee.name} ${employee.surname}</h5>
                                    <p class="card-text">${employee.role}</p>
                                </div>
                              </div>`;
                bestEmployeesContainer.innerHTML += card;
            });
        } catch (error) {
            console.error("Error loading employee data:", error);
        }
    }

    // Load data on page load
    window.onload = loadEmployeeData;

