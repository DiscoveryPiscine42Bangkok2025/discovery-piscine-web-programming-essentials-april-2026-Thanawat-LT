if [ "$#" -eq 0 ]; then
  echo "No arguments supplied"
else
  for folder in "$@"; do
    mkdir -p "ex$folder"
  done
fi