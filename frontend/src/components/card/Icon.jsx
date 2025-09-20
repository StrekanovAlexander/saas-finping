import * as Icons from "lucide-react";

const icons = {
    Bean: Icons.Bean,
    Bitcoin: Icons.Bitcoin,
    CircleDot: Icons.CircleDot,
    Coins: Icons.Coins,
    DollarSign: Icons.DollarSign,
    Droplet: Icons.Droplet,
    Euro: Icons.Euro, 
    JapaneseYen: Icons.JapaneseYen,
    Layers: Icons.Layers,
    Leaf: Icons.Leaf,
    Package: Icons.Package,
    PoundSterling: Icons.PoundSterling, 
    SwissFranc: Icons.SwissFranc,
    Wheat: Icons.Wheat
};

function Icon({ icon }) {
    const IconComponent = icons[icon] || Icons.Package;
    return (
        <IconComponent className="w-6 h-6 text-yellow-500" />
    )
}

export default Icon;