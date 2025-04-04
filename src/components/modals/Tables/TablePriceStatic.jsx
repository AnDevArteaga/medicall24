
const tableData = [
  { users: "1 - 149", planValue: "$59.998", discount: "0%", monthly: "$5,999,800", yearly: "$71,997,600" },
  { users: "150 - 199", planValue: "$58.000", discount: "3%", monthly: "$8,700,000", yearly: "$104,400,000" },
  { users: "200 - 299", planValue: "$56.068", discount: "7%", monthly: "$11,213,600", yearly: "$134,563,200" },
  { users: "300 - 399", planValue: "$54.201", discount: "10%", monthly: "$16,260,300", yearly: "$195,123,600" },
  { users: "400 - 499", planValue: "$45.396", discount: "13%", monthly: "$20,958,400", yearly: "$251,500,800" },
  { users: "600 - 799", planValue: "$50.651", discount: "16%", monthly: "$30,390,600", yearly: "$364,687,200" },
  { users: "800 - 1.199", planValue: "$48.964", discount: "18%", monthly: "$39,171,200", yearly: "$470,054,400" },
  { users: "1.200 - 1.599", planValue: "$47.333", discount: "21%", monthly: "$56,799,600", yearly: "$681,595,200" },
  { users: "1.600 - 2.399", planValue: "$45.757", discount: "24%", monthly: "$73,211,200", yearly: "$878,534,400" },
  { users: "2.400 - 3.199", planValue: "$44.233", discount: "26%", monthly: "$106,159,200", yearly: "$1,273,910,400" },
  { users: "3.200 - 4.799", planValue: "$42.760", discount: "29%", monthly: "$136,832,000", yearly: "$1,641,984,000" },
  { users: "4.800 - 6.399", planValue: "$41.336", discount: "31%", monthly: "$198,412,800", yearly: "$2,380,953,600" },
  { users: ">= 6.400", planValue: "$39.960", discount: "33%", monthly: "$255,744,000", yearly: "$3,068,928,000" },
];


const InteractiveTable = () => {
  return (
    <div className="container mx-auto px-2 py-1">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <div className="flex justify-center">
         <span className="text-2xl mb-2 font-bold text-gray-700">
         Escala de Precios del Plan Basic
          </span> 

          </div>

          <table className="w-full">
            <thead className="bg-gradient-to-r from-pink-600 to-pink-800 text-white">
              <tr>
                {['Rango de Empleados', 'Valor por Tomador', 'Descuento', 'Valor mensual del plan', 'Valor anual del plan'].map((header, idx) => (
                  <th 
                    key={idx} 
                    className="px-6 py- text-center text-xs font-semibold uppercase tracking-wider border-b border-pink-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={`
                    transition duration-300 ease-in-out 
                    hover:bg-pink-50 text-center text-xs
                    ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  `}
                >
                  {[row.users, row.planValue, row.discount, row.monthly, row.yearly].map((cell, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className="px-2 py-2 text-sm border-b border-gray-200"
                    >
                      <span className="text-gray-800 font-medium text-sm text-center">{cell}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTable;
