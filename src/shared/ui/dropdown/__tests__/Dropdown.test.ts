import { mount, shallowMount } from "@vue/test-utils";
import Dropdown from "../Dropdown.vue";

const SELECTORS = {
  toggle: "[data-test='dropdown-toggle']",
  menu: "[data-test='dropdown-menu']",
  menuItem: "[data-test='dropdown-menu-item']",
};

const DROPDOWN_ITEMS = [
  {
    text: "Movies",
    value: "movie",
  },
  {
    text: "TV Shows",
    value: "tv",
  },
];

const SLOT_CONTENT = `<span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"></path></svg></span>`;

describe("Dropdown", () => {
  it("Dropdown должен показывать меню при клике на кнопку", async () => {
    const wrapper = shallowMount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    await wrapper.find(SELECTORS.toggle).trigger("click");
    expect(wrapper.find(SELECTORS.menu).isVisible()).toBeTruthy();
  });

  it("Dropdown должен скрывать меню при клике на кнопку, когда меню открыто", async () => {
    const wrapper = shallowMount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    const button = wrapper.find(SELECTORS.toggle);
    await button.trigger("click");
    await button.trigger("click");
    expect(wrapper.find(SELECTORS.menu).isVisible()).toBeFalsy();
  });

  it("Dropdown должен рендерить элементы меню в соответствии с пропсом items", () => {
    const wrapper = shallowMount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
    });
    const items = wrapper.findAll(SELECTORS.menuItem);
    expect(items).toHaveLength(DROPDOWN_ITEMS.length);
    items.forEach((item, index) =>
      expect(item.text()).toBe(DROPDOWN_ITEMS[index].text),
    );
  });

  it("Dropdown должен порождать событие update:selected-item со значением выбранного варианта при клике на элемент в меню", async () => {
    const wrapper = shallowMount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    await wrapper.find(SELECTORS.toggle).trigger("click");
    expect(wrapper.find(SELECTORS.menu).isVisible()).toBeTruthy();
    await wrapper.find(SELECTORS.menuItem).trigger("click");
    expect(wrapper.emitted("update:selected-item")).toHaveLength(1);
    expect(wrapper.emitted("update:selected-item")?.[0]).toEqual([
      DROPDOWN_ITEMS[0].value,
    ]);
  });

  it("Dropdown должен скрывать меню при клике на элемент в меню", async () => {
    const wrapper = shallowMount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    const menu = wrapper.find(SELECTORS.menu);
    await wrapper.find(SELECTORS.toggle).trigger("click");
    expect(menu.isVisible()).toBeTruthy();
    await wrapper.find(SELECTORS.menuItem).trigger("click");
    expect(wrapper.emitted("update:selected-item")).toHaveLength(1);
    expect(wrapper.emitted("update:selected-item")?.[0]).toEqual([
      DROPDOWN_ITEMS[0].value,
    ]);
    expect(menu.isVisible()).toBeFalsy();
  });

  it("Dropdown должен рендерить контент, переданный в слот кнопки", () => {
    const wrapper = mount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      slots: {
        toggle: SLOT_CONTENT,
      },
    });
    expect(wrapper.find(".dropdown__toggle > *").html()).toBe(SLOT_CONTENT);
  });

  it("Dropdown должен закрывать меню при нажатии на клавишу Escape, когда меню открыто", async () => {
    const wrapper = mount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    const button = wrapper.find(SELECTORS.toggle);
    const menu = wrapper.find(SELECTORS.menu);
    await button.trigger("click");
    expect(menu.isVisible()).toBeTruthy();
    await button.trigger("keydown", { key: "Escape" });
    expect(menu.isVisible()).toBeFalsy();
  });

  it("Dropdown должен закрывать меню при нажатии клавиш Shift+Tab, когда меню открыто", async () => {
    const wrapper = mount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    const button = wrapper.find(SELECTORS.toggle);
    const menu = wrapper.find(SELECTORS.menu);
    await button.trigger("click");
    expect(menu.isVisible()).toBeTruthy();
    await button.trigger("keydown", { key: "Tab", shiftKey: true });
    expect(menu.isVisible()).toBeFalsy();
  });

  it("Dropdown должен при нажатии на клавишу ArrowDown делать фокус на первый айтем в меню, когда меню открыто", async () => {
    const wrapper = mount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    const button = wrapper.find(SELECTORS.toggle);
    const menu = wrapper.find(SELECTORS.menu);
    await button.trigger("click");
    expect(menu.isVisible()).toBeTruthy();
    await button.trigger("keydown", { key: "ArrowDown" });
    const firstMenuItem = menu.find(SELECTORS.menuItem);
    expect(firstMenuItem.text()).toBe(document.activeElement?.textContent);
  });

  it("Dropdown должен при нажатии на клавишу Home делать фокус на первый айтем в меню, когда меню открыто", async () => {
    const wrapper = mount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    const button = wrapper.find(SELECTORS.toggle);
    const menu = wrapper.find(SELECTORS.menu);
    await button.trigger("click");
    expect(menu.isVisible()).toBeTruthy();
    await button.trigger("keydown", { key: "Home" });
    const firstMenuItem = menu.find(SELECTORS.menuItem);
    expect(firstMenuItem.text()).toBe(document.activeElement?.textContent);
  });

  it("Dropdown должен при нажатии на клавишу End делать фокус на последний айтем в меню, когда меню открыто", async () => {
    const wrapper = mount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    const button = wrapper.find(SELECTORS.toggle);
    const menu = wrapper.find(SELECTORS.menu);
    await button.trigger("click");
    expect(menu.isVisible()).toBeTruthy();
    await button.trigger("keydown", { key: "End" });
    const menuItems = menu.findAll(SELECTORS.menuItem);
    const lastMenuItem = menuItems[menuItems.length - 1];
    expect(lastMenuItem.text()).toBe(document.activeElement?.textContent);
  });

  it("Dropdown должен при нажатии на ArrowDown делать фокус на второй айтем, когда меню открыто и первый айтем уже находится в фокусе", async () => {
    const wrapper = mount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    const button = wrapper.find(SELECTORS.toggle);
    const menu = wrapper.find(SELECTORS.menu);
    await button.trigger("click");
    expect(menu.isVisible()).toBeTruthy();
    await button.trigger("keydown", { key: "ArrowDown" });
    const menuItems = menu.findAll(SELECTORS.menuItem);
    expect(menuItems[0].text()).toBe(document.activeElement?.textContent);
    menuItems[0].trigger("keydown", { key: "ArrowDown" });
    expect(menuItems[1].text()).toBe(document.activeElement?.textContent);
  });

  it("Dropdown должен при нажатии на ArrowUp делать фокус на первый айтем, когда меню открыто и второй айтем уже находится в фокусе,", async () => {
    const wrapper = mount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    const button = wrapper.find(SELECTORS.toggle);
    const menu = wrapper.find(SELECTORS.menu);
    await button.trigger("click");
    expect(menu.isVisible()).toBeTruthy();
    await button.trigger("keydown", { key: "ArrowDown" });
    const menuItems = menu.findAll(SELECTORS.menuItem);
    expect(menuItems[0].text()).toBe(document.activeElement?.textContent);
    menuItems[0].trigger("keydown", { key: "ArrowDown" });
    expect(menuItems[1].text()).toBe(document.activeElement?.textContent);
    menuItems[1].trigger("keydown", { key: "ArrowUp" });
    expect(menuItems[0].text()).toBe(document.activeElement?.textContent);
  });

  it("Dropdown должен при нажатии на Tab делать фокус на первый айтем в меню, когда меню открыто, при повторном нажатии на Tab, меню должно закрываться и фокус ставиться на кнопку", async () => {
    const wrapper = mount(Dropdown, {
      props: {
        items: DROPDOWN_ITEMS,
      },
      attachTo: document.body,
    });
    const button = wrapper.find(SELECTORS.toggle);
    const menu = wrapper.find(SELECTORS.menu);
    await button.trigger("click");
    expect(menu.isVisible()).toBeTruthy();
    await button.trigger("keydown", { key: "Tab" });
    const firstMenuItem = menu.find(SELECTORS.menuItem);
    expect(firstMenuItem.text()).toBe(document.activeElement?.textContent);
    await firstMenuItem.trigger("keydown", { key: "Tab" });
    expect(menu.isVisible()).toBeFalsy();
    expect(button.text()).toBe(document.activeElement?.textContent);
  });
});
