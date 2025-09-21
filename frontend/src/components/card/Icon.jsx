import * as Icons from "lucide-react";

const icons = {
    Bean: Icons.Bean,
    Bitcoin: Icons.Bitcoin,
    CircleDot: Icons.CircleDot,
    Citrus: Icons.Citrus,
    Coins: Icons.Coins,
    DollarSign: Icons.DollarSign,
    Droplet: Icons.Droplet,
    Euro: Icons.Euro, 
    Flower: Icons.Flower, 
    Fuel: Icons.Fuel,
    IndianRupee: Icons.IndianRupee,
    JapaneseYen: Icons.JapaneseYen,
    Layers: Icons.Layers,
    Leaf: Icons.Leaf,
    Package: Icons.Package,
    PoundSterling: Icons.PoundSterling, 
    SwissFranc: Icons.SwissFranc,
    Wheat: Icons.Wheat
};

function getOptions(icon) {
    switch (icon) {
        case "Coins": return "w-6 h-6 text-purple-500";
        case "Bitcoin":
        case "DollarSign":    
        case "Euro":
        case "IndianRupee":    
        case "JapaneseYen":
        case "PoundSterling":
        case "SwissFranc": return "w-6 h-6 text-red-500";
        case "CircleDot": return "w-6 h-6 text-yellow-500";
        case "Droplet": return "w-6 h-6 text-blue-500";
        case "Leaf": return "w-6 h-6 text-green-600";
        case "Wheat": return "w-6 h-6 text-amber-500";
        default: return "w-6 h-6 text-gray-500";
    }
}

function Icon({ icon }) {
    const IconComponent = icons[icon] || Icons.Package;
    const options = getOptions(icon);
    return (
        <IconComponent className={options} />
    )
}

export default Icon;