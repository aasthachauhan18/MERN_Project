import Menu from "../models/Menu.js";

export const getMenus = async (req, res) => {
  const menus = await Menu.find();

  const fixedMenus = menus.map((menu) => ({
    ...menu.toObject(),
    path: menu.path?.startsWith("/") ? menu.path : `/${menu.path}`,
  }));

  res.json(fixedMenus);
};

export const createMenu = async (req, res) => {
  const { name, path, roles } = req.body;

  const menu = await Menu.create({
    name,
    path,
    roles: roles || [],
  });

  res.json(menu);
};

export const updateMenu = async (req, res) => {
  const { name, path, roles } = req.body;

  const menu = await Menu.findByIdAndUpdate(
    req.params.id,
    {
      name,
      path,
      roles: roles || [],
    },
    { new: true }
  );

  res.json(menu);
};

export const deleteMenu = async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};