if ($Host.Name -eq "ConsoleHost") {
    Write-Host "AtharvaBapat"
    Write-Host "Conda environment setup may take some time..."
} else {
    # For cmd, use echo
    echo "AtharvaBapat iiii"
    echo "Conda environment setup may take some time..."
}
# conda create -n neuman_env python=3.7 -y
# conda activate neuman_env
# conda install pytorch==1.8.0 torchvision==0.9.0 cudatoolkit=10.2 -c pytorch
# conda install -c fvcore -c iopath -c conda-forge fvcore iopath
# conda install -c bottler nvidiacub
# conda install pytorch3d -c pytorch3d
# conda install -c conda-forge igl
# pip install opencv-python joblib open3d imageio tensorboardX chumpy lpips scikit-image ipython matplotlib
echo Completed