#!/usr/bin/env sh

set -eu

DEST="$HOME/cardoz/"

echo "Starting FreeBSD configuration migration..."

# Doom Emacs
if [ -d "$HOME/.config/doom" ]; then
	cp -Rp "$HOME/.config/doom/." "$DEST/emacs/"
elif [ -d "$HOME/.doom.d" ]; then
	cp -Rp "$HOME/.doom.d/." "$DEST/emacs/"
fi

# Alacritty
if [ -d "$HOME/.config/alacritty" ]; then
	cp -Rp "$HOME/.config/alacritty/." "$DEST/alacritty/"
fi

# XFCE
if [ -d "$HOME/.config/xfce4" ]; then
	cp -Rp "$HOME/.config/xfce4/." "$DEST/xfce/"
fi

# Zsh
for file in .zshrc .zprofile .zshenv .zlogin .zlogout; do
	if [ -f "$HOME/$file" ]; then
		cp -p "$HOME/$file" "$DEST/zsh/"
	fi
done

# Xorg configuration
for dir in /etc/X11 /usr/local/etc/X11; do
	if [ -d "$dir" ]; then
		for file in xorg.conf; do
			if [ -f "$dir/$file" ]; then
				cp -p "$dir/$file" "$DEST/xorg/"
			fi
		done

		if [ -d "$dir/xorg.conf.d" ]; then
			cp -Rp "$dir/xorg.conf.d/." "$DEST/xorg/xorg.conf.d/"
		fi
	fi
done

echo "Migration completed!"
echo "Destination: $DEST"
