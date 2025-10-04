const adminPaths2 = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "ADMINDASHBOARD",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "CREATEADMIN",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "CREATEFACULTY",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "CREATESTUDENT",
      },
    ],
  },
];

const res = adminPaths2.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      key: item.name,
      label: "NAVLINK",
    });
  }
  if (item.children && item.name) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: "NAVLINK",
      })),
    });
  }
  return acc;
}, []);

console.log(JSON.stringify(res));

// const res = adminPaths2.reduce((acc, item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }
//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
//   return acc;
// }, []);
