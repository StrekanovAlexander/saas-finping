import * as Icons from "lucide-react";

const icons = {
    Bitcoin: Icons.Bitcoin,
    CircleDot: Icons.CircleDot,
    Coins: Icons.Coins,
    Droplet: Icons.Droplet,
    Euro: Icons.Euro, 
    JapaneseYen: Icons.JapaneseYen,
    Layers: Icons.Layers,
    Leaf: Icons.Leaf,
    Package: Icons.Package,
    PoundSterling: Icons.PoundSterling, 
};

function Icon({ icon }) {
    const IconComponent = icons[icon] || Icons.Package;
    return (
        <IconComponent className="w-6 h-6 text-yellow-500" />
    )
}

export default Icon;