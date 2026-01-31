
import os

content = """---
---

@import "nexus/tokens";
@import "nexus/reset";
@import "nexus/glass";
@import "nexus/typography";
@import "nexus/layout";
@import "nexus/buttons";
@import "nexus/cards";
@import "nexus/hero";
@import "nexus/header";

// Utility classes
.text-gold {
    color: $color-gold;
}

.text-center {
    text-align: center;
}

.mb-lg {
    margin-bottom: $space-lg;
}

.section-padding {
    padding: $space-xl 0;
}
"""

path = r"c:\Users\ndabe\Documents\site\ndabene.github.io\assets\css\nexus.scss"

with open(path, "w", encoding="utf-8", newline="\n") as f:
    f.write(content)

print(f"Written {path}")
