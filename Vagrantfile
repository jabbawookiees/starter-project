# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "ubuntu/trusty64"
	config.vm.box_url = "https://vagrantcloud.com/ubuntu/boxes/trusty64/versions/20150521.0.0/providers/virtualbox.box"
    config.vm.hostname = "starter-project"

    config.vm.network "private_network", ip: "172.16.0.24"
    config.vm.network "forwarded_port", guest: 80, host: 18000

    config.vm.synced_folder ".", "/home/vagrant/starter-project"

    config.vm.provision "ansible" do |ansible|
        ansible.playbook = "ansible/vagrant.yml"
        ansible.inventory_path = "ansible/hosts"
        ansible.sudo = true
    end
end
