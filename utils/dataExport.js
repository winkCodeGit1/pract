/* eslint-disable no-unused-vars */
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import ahmis1 from '../assets/Images/ahmis1.png';
import call from '../assets/Images/call.png';
import mail from '../assets/Images/mail.png';

export const generatePdf = (data, columns) => {
  const [W, H] = [400, 210];
  let margin = 10;

  const pdf = new jsPDF('l', 'mm', [W, H]);
  var width = pdf.internal.pageSize.getWidth();
  var height = pdf.internal.pageSize.getHeight();
  function addHeaderAndFooter() {
    const totalPages = pdf.internal.getNumberOfPages();
    const lastPage = pdf.internal.getNumberOfPages() - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      let str = 'Page ' + i + ' of ' + totalPages;
      pdf.setFontSize(10);
      pdf.text(str, width - 28, height - 10);
      if (lastPage === i) {
        pdf.text(str, width - 28, height - 10);
      }
    }
  }

  let Y = margin;

  pdf.setFontSize(10);
  const img = new Image();
  img.src = ahmis1;
  pdf.addImage(ahmis1, 'PNG', 10, 10, 20, 20);
  let eventName = pdf.splitTextToSize('Bharat Electronics Hospital', 150);
  pdf.text(eventName, 34, 22);
  pdf.addImage(call, 'PNG', W - 54, 15, 4, 4);
  pdf.text('845689546 || 845689546', W - 10, 18, {
    align: 'right',
  });
  pdf.addImage(mail, 'PNG', W - 47, 21, 4, 3);
  pdf.text('info@hospital.com', W - 10, 24, {
    align: 'right',
  });

  pdf.text(`Report Generated By: Admin, ${new Date()}`, W - 10, 30, {
    align: 'right',
  });

  Y += 30;
  pdf.autoTable({
    // html: `#my-table`,
    // head:[column.map((item) => (item.header))],
    body: data?.map((item) => ({ ...item, active: item.active === true ? 'Active' : 'Inactive' })),

    columns: columns?.map((item) => ({ header: item.header, dataKey: item.accessorKey })),
    startY: Y,
    margin: {
      top: margin * 2.3,
      bottom: margin * 2,
      left: margin,
      right: margin,
    },
    theme: 'striped',
  });
  addHeaderAndFooter();
  pdf.save('table.pdf');
  console.log(data, '----data');
};

export function generateCsv(data, columns) {
  if (data.length) {
    const nestedRows = [];
    const header = columns.map((h) => h.header);

    data.forEach((item) => {
      const row = [];
      columns.forEach((c) => {
        console.log(c, 'p');
        if (c.accessorKey !== 'active') {
          row.push(item[c.accessorKey]);
        } else {
          row.push(item[c.accessorKey] ? 'Active' : 'InActive');
        }
      });
      nestedRows.push(row);
    });

    // Create a workbook
    const wb = XLSX.utils.book_new();
    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet([header, ...nestedRows], { origin: 'A6' });

    // Add header information
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        ['RAJA RAMDEO ANANDILAL PODAR (RRAP) CENTRAL AYURVEDA RESEARCH INSTITUTE'],
        ['OPD Report - Registration / Consultation Report'],
        ['No. of Health Facilities: 1'],
        ['Report generated on: 30-12-2023 , 11:52:34 AM'],
      ],
      { origin: 'A1' }
    );

    // Set header style (bold, center, and middle)
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: header.length - 1 } }];
    // Merge cells A2 to E2
    ws['!merges'].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 4 } });
    ws['!merges'].push({ s: { r: 2, c: 0 }, e: { r: 2, c: 4 } });
    ws['!merges'].push({ s: { r: 3, c: 0 }, e: { r: 3, c: 4 } });
    ws['!merges'].push({ s: { r: 4, c: 0 }, e: { r: 4, c: 4 } });

    // Set the column width for columns 1 to 10
    const colWidth = Array(10).fill({ wch: 15 });
    ws['!cols'] = colWidth;

    // Merge cells A2, A3, A4 with A1

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // Save the workbook to a file in xlsx format
    XLSX.writeFile(wb, 'output.xlsx');
    console.log('Excel file created successfully.');
  }
}
