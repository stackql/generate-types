function convertToPascalCase(str: string) {
  return str.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
}

function getAllTypes(
  data: object,
  objName: string,
  refs: { [index: string]: any } = {},
) {
  let memberArr = [];
  for (let k in data) {
    let typeArr = [];
    // assign nulls to any
    if (data[k as keyof typeof data] === null) {
      typeArr.push(k);
      typeArr.push("any");
    } else {
      if (typeof data[k as keyof typeof data] === "object") {
        if (Array.isArray(data[k as keyof typeof data])) {
          // its an array, get the type of the first element
          typeArr.push(k);
          typeArr.push(`${typeof data[k as keyof typeof data][0]}[]`);
        } else {
          // its an object
          typeArr.push(`I${convertToPascalCase(k)}`);
          getAllTypes(
            data[k as keyof typeof data],
            `I${convertToPascalCase(k)}`,
            refs,
          );
          typeArr.push("object");
        }
      } else {
        // its a primitive
        typeArr.push(k);
        typeArr.push(typeof data[k as keyof typeof data]);
      }
    }
    memberArr.push(typeArr);
    refs[objName] = memberArr;
  }
  return refs;
}

function generateDts(types: object) {
  let dtsOutput = "declare module namespace {\n\n";
  dtsOutput += "  export interface IRootObject {\n";

  // get fields for root object
  const rootFields: object = types["root" as keyof typeof types];
  for (let field in rootFields) {
    dtsOutput += `    ${rootFields[field as keyof typeof rootFields][0]}: ${
      rootFields[field as keyof typeof rootFields][1]
    }\n`;
  }
  dtsOutput += "  }\n\n";

  // get fields for child objects
  for (const key of Object.keys(types)) {
    if (key !== "root") {
      dtsOutput += `  export interface ${key} {\n`;
      let fields: object = types[key as keyof typeof types];
      for (let field in fields) {
        dtsOutput += `    ${fields[field as keyof typeof fields][0]}: ${
          fields[field as keyof typeof fields][1]
        }\n`;
      }
      dtsOutput += "  }\n\n";
    }
  }
  dtsOutput += "}";
  return dtsOutput;
}

/**
 * Generates types from a given JSON object
 */
export async function generateTypes(inObject: object): Promise<string> {
  return generateDts(getAllTypes(inObject, "root"));
}
