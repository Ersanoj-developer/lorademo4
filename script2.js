document.addEventListener('DOMContentLoaded', function() {
    const addPackageBtn = document.getElementById('addPackageBtn');
    const generatePDFBtn = document.getElementById('generatePDFBtn');
    const packageList = document.querySelector('#packageList tbody');
    let packages = [];

    addPackageBtn.addEventListener('click', function() {
        const clientName = document.getElementById('clientName').value.trim();
        const clientLocation = document.getElementById('clientLocation').value.trim();
        const clientPhone = document.getElementById('clientPhone').value.trim();
        const packageName = document.getElementById('packageName').value.trim();
        const noOfDays = document.getElementById('noOfDays').value.trim();
        const tourLocation = document.getElementById('tourLocation').value.trim();
        const flightDetails = document.getElementById('flightDetails').value;

        if (clientName && clientLocation && clientPhone && packageName && noOfDays && tourLocation && flightDetails !== "None") {
            const packageObj = {
                clientName,
                clientLocation,
                clientPhone,
                packageName,
                noOfDays,
                tourLocation,
                flightDetails
            };
            packages.push(packageObj);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${packageName}</td>
                <td>${tourLocation}</td>
                <td>${noOfDays}</td>
                <td>${flightDetails}</td>
                <td><button class="deleteBtn">Delete</button></td>
            `;

            const deleteBtn = row.querySelector('.deleteBtn');
            deleteBtn.addEventListener('click', function() {
                packageList.removeChild(row);
                packages = packages.filter(p => p.packageName !== packageName);
            });

            packageList.appendChild(row);

            // Clear input fields
            document.getElementById('clientName').value = '';
            document.getElementById('clientLocation').value = '';
            document.getElementById('clientPhone').value = '';
            document.getElementById('packageName').value = '';
            document.getElementById('noOfDays').value = '';
            document.getElementById('tourLocation').value = '';
            document.getElementById('flightDetails').value = 'None';
        } else {
            alert('Please fill out all fields.');
        }
    });

    generatePDFBtn.addEventListener('click', function() {
        if (packages.length === 0) {
            alert('No packages to print.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add letterhead
        doc.setFontSize(22);
        doc.text("Travel Agency", 20, 20);
        doc.setFontSize(16);
        doc.text("Tour Package Quotation", 20, 30);
        doc.setFontSize(12);
        doc.text("Address: 123 Travel Lane, Adventure City, Country", 20, 40);
        doc.text("Phone: +123 456 7890 | Email: info@travelagency.com", 20, 45);
        doc.text("Client Name: " + packages[0].clientName, 20, 60);
        doc.text("Client Location: " + packages[0].clientLocation, 20, 65);
        doc.text("Client Phone: " + packages[0].clientPhone, 20, 70);

        // Add tour packages
        let y = 80;
        packages.forEach((pkg, index) => {
            doc.text(`${index + 1}. Package: ${pkg.packageName}`, 20, y);
            doc.text(`   Location: ${pkg.tourLocation}`, 20, y + 5);
            doc.text(`   Days: ${pkg.noOfDays}`, 20, y + 10);
            doc.text(`   Flight: ${pkg.flightDetails}`, 20, y + 15);
            y += 25;
        });

        doc.save('quotation.pdf');
    });
});
