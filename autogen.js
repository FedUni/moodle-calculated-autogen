/** Copyright 2022 Cameron Foale / Federation University Australia */
(function () {
	// pull out a mapping from number to value
	const table = document.querySelector(".qtext tbody");
	if (!table) return;
	
	// Cells must contain something like 1 = y
	const re = /^\s*(\d+)\s*=\s*?(.*?)\s*$/;
	for (let row of table.querySelectorAll("tr")) {
		const cells = Array.prototype.slice.apply(row.querySelectorAll("td"), [0]);
		const firstCell = cells[0];
		const span = firstCell.querySelector("span");
		if (!span) continue;
		
		const searchValue = span.textContent.trim();
		
		const spanPre = firstCell.childNodes[0];
		
		for (let cell of cells.slice(1)) {
			const match = re.exec(cell.textContent);
			if (match && match[1] === searchValue) {
				span.textContent = match[2];
				
				// fix a -> an
				if (spanPre.textContent.match(/\s*a\s*$/)) {
					if (match[2].match(/^\s*[aeiouAEIOU].*$/)) {
						spanPre.textContent += "n";
					}
				}
				
				break;
			}
		}
	}
	
	// hide the options
	const style = ".qtext td { display: none; }\n" +
	".qtext td:first-child { display: table-cell; }\n" +
	".d-print-none { display: none; }\n" +
	".info { display: none; }";
	
	const css = document.createElement("style");
	css.textContent = style;
	document.head.append(css);
})();
