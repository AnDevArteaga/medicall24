import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const getUniqueColors = (dataLength) => {
  const colors = ["#C2185D", "#E8870C", "#555555"]; //Magenta, Naranja, gris
  const assignedColors = new Set();
  
  return Array.from({ length: dataLength }, (_, i) => {
    let color;
    do {
      color = colors[i % colors.length]; // Selecciona el color en orden sin repetir hasta agotar la lista
    } while (assignedColors.has(color)); // Evita colores repetidos
    
    assignedColors.add(color);
    return color;
  });
};


const Example = ({ data }) => {
  console.log(data);
  // Generar colores únicos para cada dato
  const uniqueColors = getUniqueColors(data.length);
  
  const newData = data.map((item, index) => ({
    ...item,
    fill: uniqueColors[index]
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={newData}
          cx="50%"
          cy="50%"
          outerRadius={70}
          fill="#8884d8"
          label
          
          
        />
    {/* <Legend /> */}
    <Tooltip wrapperStyle={{ backgroundColor: 'white', borderRadius: '3px', fontSize: '11px'}} />
    <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Example;

