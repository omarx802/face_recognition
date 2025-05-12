import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const { id, event, timing, status, person } = await req.json();

    // Define the file path for data.json
    const filePath = path.join(process.cwd(), 'public', 'data.json');

    // Read the current data from the file
    let data = [];
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileData);
    } catch (error) {
      // Handle if the file doesn't exist yet
      console.error("Error reading the data.json file:", error);
    }

    // Add new data (you can modify this as per your requirements)
    const newData = {
      id,
      event,
      timing,
      status,
      person

    };
    data.push(newData);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ message: 'Data updated successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to update data.json', error: error.message }), { status: 500 });
  }
}
