//set color of selected tag
const tagStyles = {
    پایین: {
        tagBg: "bg-[#C3FFF1]",
        tagText: "text-[#11A483]",
        colorBg: "bg-[#11A483]"
    },
    متوسط: {
        tagBg: "bg-[#FFEFD6]",
        tagText: "text-[#FFAF37]",
        colorBg: "bg-[#FFAF37]"
    },
    بالا: {
        tagBg: "bg-[#FFE2DB]",
        tagText: "text-[#FF5F37]",
        colorBg: "bg-[#FF5F37]"
    }
}


export function applyTagStyle(tagName, tag, color) {

    if (!tagName && !tagStyles[tagName]) return

    const { tagBg, tagText, colorBg } = tagStyles[tagName]

    tag.classList =  "rounded-[4px] font-bold text-xs py-[2px] px-[8px] flex items-center gap-1";
    tag.classList.add(tagBg, tagText)
    color?.classList.add(colorBg)

    const title = tag.querySelector(".tag-title");
    if (title) title.textContent = tagName;
}